import { useParams } from "react-router-dom";

class InvalidIdParamError extends Error {
  constructor(id?: string) {
    super(`Invalid id param in path: ${id}. Id should be a valid integer`);
  }
}

export function useIdParam(): number {
  const { id } = useParams();
  const idInt = Number(id);
  if (!idInt || Number.isNaN(idInt)) {
    throw new InvalidIdParamError(id);
  }
  return idInt;
}
