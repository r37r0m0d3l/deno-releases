import * as fs from "fs";

import { default as RSSFeed } from "feed";

// import { VicisTransformDate } from "@vicis/transform-date";
// console.log(VicisTransformDate.toISO8601()(new Date()));

const { Feed } = RSSFeed;

const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));

const me = {
    name: "Anton Trofimenko",
    email: "r37r0m0d3l@protonmail.com",
    link: "https://r37r0m0d3l.icu/",
};

const feed = new Feed({
    title: "Deno Releases",
    description: "Deno Releases watchlist",
    id: "https://r37r0m0d3l.github.io/deno-releases/",
    link: "https://r37r0m0d3l.github.io/deno-releases/",
    language: "en",
    image:
        "https://r37r0m0d3l.github.io/deno-releases/icons/android-icon-192x192.png",
    favicon: "https://r37r0m0d3l.github.io/deno-releases/icons/favicon.ico",
    copyright: "All rights reserved 2020, Anton Trofimenko",
    updated: new Date(2020, 6, 14),
    generator: "r37r0m0d3l Awesome RSS Generator",
    feedLinks: {
        atom: "https://r37r0m0d3l.github.io/deno-releases/feed.atom",
        json: "https://r37r0m0d3l.github.io/deno-releases/feed.json",
        rss: "https://r37r0m0d3l.github.io/deno-releases/feed.rss",
    },
    author: me,
});

posts.forEach((post) => {
    feed.addItem({
        title: post.title,
        id: post.id,
        link: post.url,
        description: post.description,
        content: post.content,
        author: [me],
        contributor: [me],
        date: new Date()/*post.date*/,
        image: post.image,
    });
});

feed.addCategory("Technologies");

feed.addContributor(me);

// Output: RSS 2.0
fs.writeFileSync("./feed/feed.rss", feed.rss2(),"utf-8");

// Output: Atom 1.0
fs.writeFileSync("./feed/feed.atom", feed.atom1(),"utf-8");

// Output: JSON Feed 1.0
fs.writeFileSync("./feed/feed.json", feed.json1(),"utf-8");
