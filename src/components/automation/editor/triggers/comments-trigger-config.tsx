import { CommentRepliesEditor } from "./comment-replies-editor";
import { MediaKeywordTriggerConfig } from "./media-keyword-trigger-config";

export function CommentsTriggerConfig() {
    return (
        <>
            <MediaKeywordTriggerConfig
                type="FEED"
                title="Select Post / Reel"
                placeholder="
        Type and press enter...
      "
                helperText="
        Leave empty to trigger on all comments.
      "
            />
            <CommentRepliesEditor />
        </>
    );
}