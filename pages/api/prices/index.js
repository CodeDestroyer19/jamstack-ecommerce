import { Db, ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "../../../utils/mongoConnect"

const WebDevHandler = async (req, res) => {
  const { method } = req
  const { db } = await connectToDatabase()
  const { name, price, title, description, props, id } = req.body

  switch (method) {
    case "PUT":
      const UPDATINGPrice = new Promise((resolve, reject) => {
        resolve(
          db.collection("prices").findOneAndUpdate(
            { _id: new ObjectId(id) },
            {
              $set: {
                name,
                price,
                title,
                description,
                props,
                created: new Date().toISOString(),
              },
            }
          )
        )
      })

      UPDATINGPrice.then(async () => {
        res.status(200).json({ result: true, message: "Successfully Updated" })
      })

      UPDATINGPrice.catch(() => {
        res.status(400).json({ success: false, message: "Failed Horribly" })
      })

      break
    case "POST":
      const InsertPromise = new Promise((resolve, reject) => {
        resolve(
          db.collection("prices").insertOne({
            name,
            price,
            title,
            description,
            props,
            created: new Date().toISOString(),
          })
        )
      })

      InsertPromise.then(() => {
        res
          .status(200)
          .json({ success: true, message: "Inserted Successfully!" })
      })

      break
    case "DELETE":
      const deletePrice = new Promise((resolve, reject) => {
        resolve(
          db.collection("prices").findOneAndDelete({ _id: new ObjectId(id) })
        )
      })

      deletePrice.then(() => {
        res.status(200).json({ success: true, message: "Deleted successfuly" })
      })

      deletePrice.catch((err) => {
        res.status(404).json({ success: false, message: err.message })
      })
      break
    default:
      res.status(400).json({ success: false, message: "No match" })
  }
}

export default WebDevHandler
