import { deleteMention, postOneMention, retrieveMentionByName } from "./mentions-model.js";


export async function getMentionByNameController(req, res){
    // el name me vendrá por header
    const name = req.get('name');
    const arrayMentions = await retrieveMentionByName(name);
    if(arrayMentions.length === 0){
        res.json('no notifications')
    }else{
        res.json(arrayMentions);
    }

}

export async function postMentionController(req, res){
    const {mention,name} = req.body;

    const modified = await postOneMention(name, mention);
    if(modified.modifiedCount===0){
        res.json('user not found')
    }else{
        res.json('posted')
    }
}


export async function deleteMentionController(req, res){
    const user = await deleteMention(req.body.name, req.body.course);
    res.json(user);
}