const handleErrors = (err) => {
    //err messages err codes - 11000
    let errors = {tag: "", title: "", paragraph: "",image:""};
    if (err.message.includes('Blog validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    };

    return errors;
};

module.exports = handleErrors