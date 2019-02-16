const { gql } = require('./utils');

const addComment = gql`
    mutation {
        addComment(input: {subjectId: "MDU6SXNzdWU0MTEwMzY3NzM=", body: "# Hello\nI am a test"}) {
            subject {
                id
            }
            commentEdge {
                node {
                    id
                }
            }
        }
    }
`;

const minimizeComment = gql`
    mutation {
        minimizeComment(
            input: {
                classifier: OUTDATED,
                subjectId: "MDEyOklzc3VlQ29tbWVudDQ2NDMwMTA4MA=="
            }
        ) {
            minimizedComment {
                isMinimized,
                minimizedReason
            }
        }
    }
`;

const createCheckRun = gql`
    mutation {
        createCheckRun(
            input: {
                name: "Test check"
                headSha: "70ca309caa7f112ddf877df56ef228b02bb9c1d8",
                repositoryId: "MDEwOlJlcG9zaXRvcnkxNzA5NjgzMjU=",
            }
        ) {
            checkRun {
                id,
                status,
                name,
            }
        }
    }
`;

module.exports = {
    addComment,
    minimizeComment,
    createCheckRun
};
