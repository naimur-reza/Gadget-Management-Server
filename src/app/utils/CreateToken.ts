import jwt from "jsonwebtoken";

export default function CreateToken(payload: { email: string; role: string }) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: "3d",
  });
}
