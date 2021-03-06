import { RESTDataSource } from 'apollo-datasource-rest';

// https://johnfay.dev/blog/blog/creating-graphql-api-using-rest-api/
export default class Github extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.github.com/';
    }

    // https://docs.github.com/en/rest/reference/users#get-contextual-information-for-a-user
    async getGistsByUser(username) {
        const response = await this.get(`users/${username}/gists`);
        // remove file key and make files iterable
        return response.map(({ files, ...gist }) => ({ ...gist, files: Object.values(files).map((file) => file) }));
    }

    // https://docs.github.com/en/rest/reference/gists#get-a-gist
    async getGistById(id) {
        const response = await this.get(`gists/${id}`);
        const { files, ...gist } = response;
        // remove file key and make files iterable
        return { ...gist, files: Object.values(files) };
    }
}
