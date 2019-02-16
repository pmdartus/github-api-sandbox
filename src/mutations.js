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

module.exports = {
    addComment,
    minimizeComment
};
