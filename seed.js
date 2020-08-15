module.exports = function seed() {
  CampGrounds.insertMany([
    {
      name: "Salmon Creek",
      image:
        "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus aliquam, sequi aut, quas quasi, maiores possimus modi explicabo voluptatum eveniet non quaerat. Voluptatem ullam distinctio esse impedit minus illum explicabo.",
      price: 9.99,
    },
    {
      name: "Granite Hill",
      image:
        "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus aliquam, sequi aut, quas quasi, maiores possimus modi explicabo voluptatum eveniet non quaerat. Voluptatem ullam distinctio esse impedit minus illum explicabo.",
      price: 9.99,
    },
    {
      name: "Mountain Goat's rest",
      image:
        "https://images.pexels.com/photos/2653168/pexels-photo-2653168.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus aliquam, sequi aut, quas quasi, maiores possimus modi explicabo voluptatum eveniet non quaerat. Voluptatem ullam distinctio esse impedit minus illum explicabo.",
      price: 9.99,
    },
  ]);

  Comments.create({
    text: "asknlk alskmdlk laskmdlakdl laskd lask dkneflk reklfmlkerm",
    author: "John Smith",
  }).then(async (comment) => {
    const camps = await CampGrounds.find();
    camps.forEach((camp) => {
      camp.comments.push(comment);
      camp.save();
    });
  });
};
