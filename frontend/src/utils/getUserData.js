import backend from "../api/backend";

async function getUserData(userID) {
    try {
        const token = localStorage.getItem('auth-token');

        if (!token) {
            throw new Error('No authorization token found.');
        }

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        
        const response = await backend.get(`/user/${userID}`, config);
        
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Unable to fetch user data.');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

export default getUserData;
