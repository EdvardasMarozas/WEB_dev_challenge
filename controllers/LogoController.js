const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  generateLogoImage: async function (req, res) {
    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer bf73b1bc9bbb422dbb1dbe0639e334b0`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    }
    try {
      const someData = "My company makes pancakes, I need a logo fast";
      const url = "http://172.16.50.58:5000/api/image/generate";
      const dataToBeSent = {
        prompt: String(someData),
      };
      postData(url, dataToBeSent).then(async (data) => {
        console.log(data);
        if (data.code === 200) {
          const logo = await prisma.logosList.create({
            data: {
              image_id: String(data.job_id),
            },
          });
          res.status(200).json({ message: "success", logo: logo });
        } else {
          res.status(400).json({ message: "failure" });
        }
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  getJobStatus: async function (req, res) {
    try {
      const id = req.params.id;
      const jobStatus = await prisma.logosList.findFirst({
        where: {
          id: Number(id),
        },
      });
      const jobResponse = await fetch(
        `http://172.16.50.58:5000/api/image/status/${jobStatus.image_id}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer bf73b1bc9bbb422dbb1dbe0639e334b0`,
            "Content-Type": "application/json",
          },
        }
      );
      const job = await jobResponse.json();
      res.status(200).json({ job: job });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  getLogo: async function (req, res) {},
  updateLogo: async function (req, res) {},
  makeLogoFavourite: async function (req, res) {
    try {
      const id = req.params.id;
      const favourited = await prisma.favouriteLogosList.create({});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  deleteLogo: async function (req, res) {
    try {
      const id = req.params.id;
      const deleted_logo = await prisma.logosList.delete({
        where: {
          id: Number(id),
        },
      });
      res
        .status(200)
        .json({ status: "deleted succesfully", data: deleted_logo });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};
