import { createContext } from "react";
import { IPostProps } from "../../components/organisms";

const defaultContextValue: IPostProps[] = [{
    postId: '',
    authorId: '',
    author: '',
    timestamp: new Date(),
    media: '',
    likes: [],
    comments: [],
}];

const FeedItemsContext = createContext(defaultContextValue);

export { FeedItemsContext };