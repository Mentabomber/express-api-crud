const { PrismaClient } = require("@prisma/client");
const { log } = require("util");
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


async function show(req, res){

    const showInputData = req.params.slug;

    const showPost = await prisma.post
    .findUnique({
        where: {
            slug: showInputData,
        },

    });
    if (!showInputData) {
        throw new Error("Not found");
      }

    return res.json(showPost);
}
    
async function showAll(req, res){

    const dataFilter = req.body;
    console.log(dataFilter.content);
    if (dataFilter === "") {
        const showAllPosts = await prisma.post
        .findMany()
        .then((showAllPosts) => {
        console.log("Tutti i posts:", showAllPosts);
        })
        .catch((error) => console.error(error));

        return res.json(showAllPosts);
    }else if(dataFilter.hasOwnProperty("published")){
        const showAllPosts = await prisma.post
        .findMany({
            where: {
                published: dataFilter.published
            }
        })
        .then((showAllPosts) => {
        console.log("Tutti i posts con filter published:" , showAllPosts);
        })
        .catch((error) => console.error(error));

        return res.json(showAllPosts);
    }else if(dataFilter.hasOwnProperty("content")){
        const showAllPosts = await prisma.post
        .findMany({
            where: {
                content: { contains: dataFilter.content }
            }
        })
        .then((showAllPosts) => {
        console.log("Tutti i posts con filter :" + dataFilter.content + showAllPosts);
        })
        .catch((error) => console.error(error));

        return res.json(showAllPosts);
    }
    
    

}

async function update(req, res){

    const postToUpdate = req.params;
    const dataToUpdate = req.body;

    const updatePost = await prisma.post
    .update({
        where: {
          slug: postToUpdate.slug,
        },
        data: {
            title:dataToUpdate.title,
            slug: dataToUpdate.slug,
            image:dataToUpdate.image,
            content: dataToUpdate.content,
            published:dataToUpdate.published,
        },
    })
    .then((updatedPost) => {
    console.log("Il post è stato modificato:", updatedPost);
    })
    .catch((error) => console.error(error));

    return res.json(updatePost);
}

async function destroy(req,res){

    const postToDelete = req.params;

    const deletePost = await prisma.post
    .delete({
        where: {
            slug: postToDelete.slug,
          },
    
    })
    .then((deletePost) => {
    console.log("Il post è stato cancellato:", deletePost);
    })
    .catch((error) => console.error(error));
    return res.json(deletePost);
}

module.exports = {
    store,
    show,
    showAll,
    update,
    destroy
  };

