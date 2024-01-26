//useTagsManager.jsx
import { useState } from 'react';

const useTagsManager = (initialTags = '') => {
    const [tags, setTags] = useState(initialTags);
    const [newTag, setNewTag] = useState("");

    const handleNewTagChange = (e) => {
        setNewTag(e.target.value);
    };

    const handleAddTag = () => {
        addTag(newTag);
        setNewTag("");
    };

    const handleDeleteTag = (tagToDelete) => {
        setTags(tags
            .split(" ")
            .filter((tag) => tag !== tagToDelete)
            .join(" ")
        );
    };

    const addTag = (newTag) => {
        if (!newTag.trim() || tags.split(" ").includes(newTag)) return;
        setTags(`${tags} ${newTag}`.trim());
    };

    return {
        tags,
        newTag,
        handleNewTagChange,
        handleAddTag,
        handleDeleteTag
    };
};

export default useTagsManager;
