import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "../../../../util/mongodb"

const signUp = async (req, res) => {
  const { db } = await connectToDatabase()
  const { email, password, userName } = req.body

  const NewUser = new Promise(async (resolve, reject) => {
    const existingUser = await db.collection("admins").findOne({ email })
    if (existingUser) {
      return res.status(400).send({ result: "User exists already" })
    }
    if (password !== confirmPassword) {
      return res.status(401).json({ result: "Password did not match" })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    resolve(
      await db.collection("admins").insertOne({
        email,
        password: hashedPassword,
        userName,
      })
    )
  })

  NewUser.then((resolution) => {
    const token = jwt.sign(
      {
        email: resolution.ops[0].email,
        id: resolution.ops[0]._id,
      },
      "test",
      {
        expiresIn: "1000000h",
      }
    )
    const { email, name, _id } = resolution.ops[0]

    res.status(200).json({
      result: { email, name, _id },
      token,
    })
  })

  NewUser.catch((error) => {
    res.status(400).json({ success: false, data: error.result })
  })
}

export default signUp
