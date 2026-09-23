import { z } from "zod";

const usernameSchema = z.string().min(3).max(10);


const validateUsername = usernameSchema.safeParse("Jo"); 
if (!validateUsername.success) {
  console.error(validateUsername.error);
}
else {
  console.log("It's all fine", validateUsername.data);
}