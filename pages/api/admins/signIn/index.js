import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "../../../../utils/mongoConnect"

const signIn = async (req, res) => {
  const { db } = await connectToDatabase()
  const { email, password } = req.body

  const SignAUserIn = new Promise((resolve, reject) => {
    resolve(db.collection("admins").findOne({ email }))
  })

  SignAUserIn.then(async (resolution) => {
    if (!resolution) {
      return res.status(404).json({ result: "User does not exist" })
    }
    const isPasswordCorrect = await bcrypt
      .compare(password, resolution.password)
      .then((isTrue) => {
        if (isTrue === false) {
          return res.status(400).json({ result: "Invalid password" })
        }
        return isTrue
      })

    if (isPasswordCorrect === true) {
      const token = jwt.sign(
        {
          email: resolution.email,
          id: resolution._id,
        },
        "test",
        {
          expiresIn: "1h",
        }
      )

      const { email, userName, _id } = resolution

      return res.status(200).json({
        result: {
          userName,
          email,
          _id,
        },
        token,
      })
    }
  })

  SignAUserIn.catch((error) => {
    res.status(400).json({ success: false, data: error.message })
  })
}

export default signIn
