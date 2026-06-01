import { MediaKeywordTriggerConfig } from "./media-keyword-trigger-config";

export function StoryTriggerConfig() {
    return (
        <MediaKeywordTriggerConfig
            type="STORY"
            title="Select Story"
            placeholder="
        wow, fire, link...
      "
            helperText="Keywords are required to trigger automation."
        />
    );
}