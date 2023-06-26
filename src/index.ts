import express  from "express";
import { router } from "./routes";
import cors from "cors";


export const app = express();

app.use(express.json());
app.use(router);
app.use(cors({
    origin: "*"
}));


app.listen(3333,() => console.log("Servidor rodando na porta 3333"));