export default function Address({
    user,
    name,
    housenumber,
    street,
    city,
    postcode
}) {
    const address = {
        user_id: user.email,
        name,
        housenumber,
        street,
        city,
        postcode
    };

    return address;
}