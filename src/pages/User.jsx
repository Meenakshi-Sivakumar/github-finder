import { useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import GithubContext from "../context/github/GithubContext"

const params = useParams()

function User() {
    const {getUser, user} = useContext(GithubContext)

    useEffect(() => {
        getUser(params.login)
        getUserRepos(params.login)
    }, [])
  return (
    <div>
      user
    </div>
  )
}

export default User
