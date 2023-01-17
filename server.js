import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;
const current = process.cwd();
app.use("/static", express.static(current + "/front/static"));
app.get("/*", (req, res) => {
  return res.sendFile(current + "/front/index.html");
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}...`);
});

//hQYZ8PhTCePfXmIpvtCY
//5BjRzmACICvbun1LEpaYearbnbjJ2eFKCmSDWzkU
