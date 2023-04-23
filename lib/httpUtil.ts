import { NextApiResponse } from "next";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DEL = "DELETE",
}

export const methodNotAllowed = (res: NextApiResponse, method?: string) =>
  res
    .status(405)
    .send({ error: `Method${method ? `' ${method}'` : ""} not allowed` });

export const noContent = (res: NextApiResponse) => res.status(204).end();

export const notFound = (res: NextApiResponse, reason?: string) => {
  res.status(404);
  if (reason) {
    res.send({ error: reason });
  } else {
    res.end();
  }
};

export const badRequest = (res: NextApiResponse, reason?: string) => {
  res.status(400);
  if (reason) {
    res.send({ error: reason });
  } else {
    res.end();
  }
};

export const ok = <T>(res: NextApiResponse, body: T) => {
  res.status(200).json(body);
};
