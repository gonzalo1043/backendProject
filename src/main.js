import { app } from "./app/app";
import { PORT } from "./config/config";


app.listen(PORT, () => {console.log('escuchando en puerto ' + PORT)})

