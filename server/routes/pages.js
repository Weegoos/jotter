exports.mainPage = (req, res) => {
    res.json({message: 'Hello from Node.js!'})
}

exports.postMessage = (req, res) => {
    const {name, surname} = req.body
    console.log(name, surname);
    
    res.json({name, surname})
};
