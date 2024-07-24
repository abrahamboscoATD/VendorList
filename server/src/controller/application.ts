import { FastifyReply, FastifyRequest } from "fastify";
import { invalid_return, valid_reply, valid_return } from "../utils/api_return";
import { application_validator } from "../validators/application_validators";
import { ZodError } from "zod";
import ApplicationListModel, { IApplicatonsList } from "../models/ApplicationModel";
import { FilterQuery, PopulateOption, PopulateOptions } from "mongoose";

export async function add_one_application_controller(req: FastifyRequest, reply: FastifyReply) {
  try {
    const data = await application_validator.parseAsync(req.body);

    if (data.support_level === "l1" && data.full_name) return invalid_return(null, "full_name is not allowed in Level one Support");

    const created_application = await new ApplicationListModel({
      added_by: data.added_by,
      vendor: data.vendor,
      phone: data.phone,
      email: data.email,
      application: data.application,
      support_level: data.support_level,
      full_name: data.full_name,
    }).save();
    return valid_return(created_application.toJSON());
  } catch (err) {
    if (err instanceof ZodError) {
      return invalid_return(err.formErrors, "");
    }
    return invalid_return(null, (err as Error).message, 500);
  }
}

export async function get_all_application_list_controller(req: FastifyRequest, reply: FastifyReply) {
  try {
    const params = req.query as any;
    const current_page = Number(params?.["page"]) === 0 ? 1 : !Number(params["page"]) ? 1 : Number(params?.["page"]);
    const page_amount = params?.["limit"] || 30;
    const select: string = params?.["select"] || "";
    const sort = params?.["sort"] || `{"createdAt":-1}`;
    const search: string = params?.search || "";
    const filter: string = decodeURIComponent(params?.filter) || "{}";

    const $sort = (_sort_q: string): Record<string, any> => {
      return JSON.parse(_sort_q);
    };

    const populate = (_select: string): PopulateOptions[] => {
      let r = [];

      if (select === "") {
        r.push({ path: "vendor" });
        return r;
      }

      if (_select.includes("vendor")) r.push({ path: "vendor" });
      if (_select.includes("added_by")) r.push({ path: "added_by" });

      return r;
    };

    const $filter = (): FilterQuery<IApplicatonsList> | {} => {
      const query = <FilterQuery<IApplicatonsList>>{};

      if (search) {
        query.$text = { $search: search };
      }

      const _validate = (p: any) => Array.isArray(p) && p.length > 0;

      if (filter !== "{}" && filter !== "undefined" && filter) {
        const filterObj = JSON.parse(filter);
        if (_validate(filterObj.email)) query.email = { $in: filterObj.email || [""] };
        if (_validate(filterObj.phone)) query.phone = { $in: filterObj.phone || [""] };
        if (_validate(filterObj.vendor)) query.vendor = { $in: filterObj.vendor };
        if (_validate(filterObj.support_level)) query.support_level = { $in: filterObj.support_level };
      }

      return query;
    };

    const total_document = await ApplicationListModel.countDocuments();
    const all_app_list = await ApplicationListModel.find($filter())
      .skip((current_page - 1) * page_amount)
      .limit(page_amount)
      .select(select)
      .populate(populate(select))
      .sort($sort(sort));

    return valid_return({
      result: all_app_list,
      pagination: {
        page: current_page,
        total_page: total_document >= page_amount ? total_document / page_amount : 0,
        limit: page_amount,
      },
    });
  } catch (err) {
    console.log(err);
    return invalid_return(null, (err as Error).message, 500);
  }
}
