const { gql } = require('./utils');

const getUserName = gql`
    query {
        viewer {
            login
        }
    }
`;

const getRateLimit = gql`
    query {
        viewer {
            login
        }
        rateLimit {
            limit
            cost
            remaining
            resetAt
        }
    }
`;

const listComments = gql`
    query listComments($repoOwner: String!, $repoName: String!, $issueNumber: Int!) {
        repository(owner: $repoOwner, name: $repoName) {
            name
            issue(number: $issueNumber) {
                title
                closed
                comments(first: 10) {
                    nodes {
                        bodyText
                    }
                }
            }
        }
    }
`;

const commentOnIssue = gql``;

module.exports = {
    getUserName,
    getRateLimit,
    listComments,
    commentOnIssue,
};
