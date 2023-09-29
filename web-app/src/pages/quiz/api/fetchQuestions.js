import config from '../../../config';

export default async function () {
    const response = await fetch(config.domain + "/api/Questions");
    return response.json();
}