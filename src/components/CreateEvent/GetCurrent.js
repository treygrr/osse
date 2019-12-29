import Axios from 'axios';
class Current {
    constructor(){
        this.url = 'http://osseapi.lavidadev.com/skillevent/create';
        this.axios = new Axios.create();
    }

    async getUserData(username) {
        const response = await this.axios.get(this.url, {
            params: {
                username: username
            }
        });
/*         .then(async(response) => {
        if (response.status === 200) {
            console.log(response.data);
            return response.data;
        }
        })
        .catch(async(error) => {
        if (error.status !== 200) {
            console.log(error);
            return;
        }
        console.log(error);
        }); */
        return response;
    }
}

export default Current;