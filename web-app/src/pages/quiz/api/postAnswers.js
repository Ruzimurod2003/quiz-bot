import config from '../../../config';

export default async function (data) {
    const response = await fetch(config.domain + "/api/QuestionsWithAnswer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data)
        }
    );
    return response.json();
}