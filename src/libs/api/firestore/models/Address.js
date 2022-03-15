export default function Address({
    user,
    name,
    housenum,
    street,
    city,
    postcode
}) {
    const address = {
        user_id: user.email,
        name,
        housenum,
        street,
        city,
        postcode
    };

    return address;
}