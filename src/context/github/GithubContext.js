import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    //Get searched users
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch (`${GITHUB_URL}/search/users?${params}`,
        // {
        //     headers: {
        //         Authorization: `token ${GITHUB_TOKEN}`
        //     }
        // }
        )
        if (response.ok) {
            const {items} = await response.json();
            dispatch({
                type: 'GET_USERS',
                payload: items,
            })
        } else {
            console.log(response.status, response.statusText);
        }
    }

    //get user profile
    const getUser = async (login) => {
        setLoading()

        const response = await fetch (`${GITHUB_URL}/users/${login}`)
        if (response.ok) {
            const data = await response.json();
            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        } else {
            window.location = '/notfound'
        }
    }

    //get user repos
    const getUserRepos = async (login) => {
        setLoading()
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 5
        })
        const response = await fetch (`${GITHUB_URL}/users/${login}/repos?${params}`)
        if (response.ok) {
            const data = await response.json();
            dispatch({
                type: 'GET_REPOS',
                payload: data,
            })
    }
    }
    const setLoading = () => {
        dispatch({
            type: 'SET_LOADING'
        })
    }
    const clearUsers = () => {
        dispatch({
            type: 'CLEAR_USERS'
        })
    }
    return <GithubContext.Provider value={{users: state.users, user: state.user,repos: state.repos, loading: state.loading, searchUsers, clearUsers, getUser, getUserRepos}}>
        {children}
    </GithubContext.Provider>
}
export default GithubContext