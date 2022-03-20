import { connectToDatabase } from "../../../../utils/mongoConnect"

const GetPrices = async (req, res) => {
  const { db } = await connectToDatabase()
  const webDeveData = new Promise((resolve, reject) => {
    resolve(db.collection("products").find().sort({ _id: 1 }).toArray())
  })

  webDeveData.then((resolution) => {
    res.status(200).json({ result: resolution })
  })

  webDeveData.catch((err) => {
    res.status(400).json({ success: false, message: err.message })
  })
}

export default GetPrices
