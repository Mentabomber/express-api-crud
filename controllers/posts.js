const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function store(req, res){

    const creationData = req.body;

    const newPost = await prisma.post
    .create({
    data: 
    {
        title:creationData.title,
        slug: creationData.slug,
        image:creationData.image,
        content: creationData.content,
        published:creationData.published,
    }

    })
    .then((newPost) => {
    console.log("Nuovo post creato:", newPost);
    })
    .catch((error) => console.error(error));

    return res.json(newPost);
}


// function show(){
//     prisma.post
//     .findUnique({
//         where: {
//             slug: 'Viaggio-a-Napoli',
//         },

//     })
//     .then((showPost) => {
//     console.log("Il post che cercavi:", showPost);
//     })
//     .catch((error) => console.error(error));
// }
    
// function showAll(){
//     prisma.post
//     .findMany()
//     .then((showAllPosts) => {
//     console.log("Tutti i posts:", showAllPosts);
//     })
//     .catch((error) => console.error(error));
// }

// function update(){
//     prisma.post
//     .update({
//         where: {
//           slug: 'Viaggio-a-Napoli',
//         },
//         data: {
//           content: 'Viaggio a Napoli con la gang',
//         },
//     })
//     .then((updatedPost) => {
//     console.log("Il post è stato modificato:", updatedPost);
//     })
//     .catch((error) => console.error(error));
// }

// function destroy(){
//     prisma.post
//     .delete({
//         where: {
//             slug: 'Viaggio-a-Roma',
//           },
    
//     })
//     .then((deletePost) => {
//     console.log("Il post è stato cancellato:", deletePost);
//     })
//     .catch((error) => console.error(error));
// }

module.exports = {
    store
  };

