//business rules for posting and feed
import * as dotenv from 'dotenv';
dotenv.config();
import { Like } from "../interfaces";
import PostRepository from "../repository/postRepository"
import iResp from "../interfaces/iResp";

export const insertLike = async (dataLike: Like) => {
    try {

        //dataLike model 
        // dataLike = { postId: '753314e2-2b78-465e-9815-b773c89f238a',
        //              userId: 'ddefa090-8cf8-4d68-88d5-5ec2ad9f1275',
        // }

        //---------------------------------------------------------------------------
        const postRep = new PostRepository();
        const response: iResp = await postRep.like(dataLike)
        //---------------------------------------------------------------------------

        if (!response.error) {
            return { response };
        } else {
            throw new Error(`${response.error}`);
        }
    }
    catch (err: any) {
        return { err: err.message }
    }
}