import axios from "axios";

const config = {
    headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcHAiLCJleHAiOjE5OTI5MjE0MTIsImlhdCI6MTY3NzU2MTQxMiwiQXV0aCI6eyJpZCI6IjRmZDkwOGY0LTNkNDUtNDQ5My1hZjAyLWEyNzVhZTc3OTQwMyIsInVzZXJOYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJsYXN0TG9naW5UaW1lIjoiMjAyMy0wMi0yOFQxMzoxNjo1Mi43OTM0NTMrMDg6MDAifX0.xGR9nB2WTwxzvBF7EXG8oR-1liES2zhqv9AfBBBqMao"
    }
}

async function listNotesApi(keyword) {
    let rep = await axios.get("/api/notes/list?keyword="+keyword, config)
    return rep.data  
}

async function createNotesApi(notesForm) {
    let rep = await axios.post("/api/notes/create", {
        name: notesForm.name,
        description: notesForm.description
    }, config)
    return rep.data  
}

async function modifyNotesApi(notesForm) {
    let rep = await axios.put("/api/notes/update", {
        id: notesForm.id,
        name: notesForm.name,
        description: notesForm.description
      }, config)
    return rep.data 
}

async function deleteNotesApi(id) {
    let rep = await axios.delete("/api/notes/delete?id=" + id, config)
    return rep.data  
}

export {
    listNotesApi,
    createNotesApi,
    modifyNotesApi,
    deleteNotesApi
}
