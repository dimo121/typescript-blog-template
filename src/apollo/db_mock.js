export const db_mock = [
  {
    id: 1,
    title: "Mock data",
    content: `This is why we have compiled a list of the best blogs and sites you should start following immediately when it comes to learning and getting up to date with React.js. Of course, this is not a complete list, but it comes really close to what thousands of developers are reading and recommending at the moment, 
                and I have found personally lots of practical examples that can be applied in production sites. dev.to
                Dev.to is a thriving community of developers who write about technology and their lives, trying to help one another out. It has currently got more than 250k registered users and offers a vast list of developer resources for almost any topic. It is what we call “the morning paper” for developers so it also contains lots of new resources for React.js.`,
    createdAt: "15/08/2021",
    owner: {
      username: "Dimo",
    },
    entries: [],
  },
  {
    id: 2,
    title: "Creating multiline strings in JavaScript",
    content: `
    Update:
    
    ECMAScript 6 (ES6) introduces a new type of literal, namely template literals. They have many features, variable interpolation among others, but most importantly for this question, they can be multiline.
    
    A template literal is delimited by backticks:
    
    var html = '
      <div>
        <span>Some HTML here</span>
      </div>
    ';
    
    (Note: I'm not advocating to use HTML in strings)
    
    Browser support is OK, but you can use transpilers to be more compatible.
    Original ES5 answer:
    
    Javascript doesn't have a here-document syntax. You can escape the literal newline, however, which comes close:
    
    "foo \
    bar"
    
    Share
    Improve this answer
    Follow
    edited Feb 14 '18 at 16:47
    Andy Mercer
    5,76566 gold badges4242 silver badges8080 bronze badges
    answered Apr 30 '09 at 2:15
    Anonymous
    43.7k11 gold badge2323 silver badges1919 bronze badges
    
        259
        Be warned: some browsers will insert newlines at the continuance, some will not. – staticsan Apr 30 '09 at 2:22
        40
        Visual Studio 2010 seems to be confused by this syntax as well. – jcollum Apr 17 '11 at 21:58
        52
        @Nate It is specified in ECMA-262 5th Edition section 7.8.4 and called LineContinuation : "A line terminator character cannot appear in a string literal, except as part of a LineContinuation to produce the empty character sequence. The correct way to cause a line terminator character to be part of the String value of a string literal is to use an escape sequence such as \n or \u000A." – some Sep 25 '12 at 2:28
        20
        I don't see why you'd do this when browsers treat it inconsistently. "line1\n" + "line2" across multiple lines is readable enough and you're guaranteed consistent behavior. – SamStephens Mar 20 '13 at 20:14
    `,
    createdAt: "12/10/2020",
    owner: {
      username: "Dimo",
    },
    entries: [],
  },
  {
    id: 3,
    title: "Top React Native Blogs, Newsletters, and Online Communities",
    content: `Keeping up with the world of React and React Native can be a tough job. You need to have a reliable set of React and React Native blogs or content sources to stay up-to-date with all of the news, updates, and announcements in React.

    That’s why we’ve compiled a list of the top React and React Native online communities including React and React Native blogs, newsletters, podcasts, social media groups, and more, for you to stay up-to-date with all that’s new in the world of React and React Native.
    
    Please note that the React and React Native blogs and communities listed below are only the ones that are currently active. While there are many other groups, some of their content is outdated, which is why they weren’t included.
    
     
    
     
    React and React Native Blogs
    
     
    React Blogs
    
    React Blog
    
    Brainhub
    
    DZone Mobile Zone
    
    ReadWrite
    
    Upmostly
    
    CSS-Tricks
    
    SitePoint
    
    Scotch.io
    
    Free Code Camp
    
    Dan Abramov
    
    Creative Tim’s Blog
    
    Remy Sharp
    
    2ality by Dr. Axel Rauschmayer
    
    C# Corner
    
    James Longster
    
    The JavaScript Playground by Jack Franklin
    
    Survive JS by Juho Vepsäläinen
    
    Ben McCormick
    
    Dave Ceddia
    
    David Walsh Blog`,
    createdAt: "12/08/2021",
    owner: {
      username: "Dimo",
    },
    entries: [],
  },
  {
    id: 4,
    title: "Title 4",
    content: `Tutorials and how-to guides are a great way to engage your audience and educate them in a single blog post. Plus, they’re easy to work on too since you’re already familiar with the topic.

    The key thing to remember when writing how-to guides is to break things down into small actionable steps. This makes it easier for readers to follow your instructions. Including step-by-step screenshots further aids in this, especially for visual learners.
    
    Marketing bloggers could write tutorials on how to use different social media platforms. Beauty bloggers can guide their readers through makeup applications. It all depends on your target audience and what they want to read.
    
    Here’s an example from YourCreativeAura.com: How To Write A Song: Songwriting Basics, this post is broken into the 5 main sections of song creation, along with imagery and examples to make it easier for beginners to understand.`,
    createdAt: "15/08/2021",
    owner: {
      username: "Dimo",
    },
    entries: [],
  },
  {
    id: 5,
    title: "Video tutorials",
    content: `If writing full guides on a subject seems too daunting for you, you can always create a video tutorial instead. Video is hugely popular – sometimes more popular than the written word, so utilising it in your blog makes a lot of sense.

    Your options for video tutorials include:
    
        Filming yourself explaining things
        Filming a screencast of you performing the tutorial steps
        Filming a screencast with a voice-over explaining as you go through the steps.
    
    When posting your tutorial to your blog, you can either host the video directly on your website by uploading it. Or, you could upload it to a video hosting site like YouTube or Vimeo and embed it in a blog post on your site.
    4. Checklists
    
    A checklist is one of the simplest types of content you can publish. We’ve all written a check-list or to-do list before and they work because they’re short, easy to digest and allow the ability to cross items off as you complete them.
    
    Translating this into a blog post is the same thing. Simply post your checklist with some supporting information.
    
    Gardening bloggers could post a checklist for planting in the spring or getting your garden ready for winter. On the other hand, interior bloggers can create a spring cleaning checklist.`,
    createdAt: "11/04/2021",
    owner: {
      username: "Dimo",
    },
    entries: [],
  },
  {
    id: 6,
    title: "Title 6",
    content: "Content 6",
    createdAt: "11/02/2021",
    owner: {
      username: "Dimo",
    },
    entries: [],
  },
  {
    id: 7,
    title: "What Are the Best React Blogs to Follow?",
    content: `This is why we have compiled a list of the best blogs and sites you should start following immediately when it comes to learning and getting up to date with React.js. Of course, this is not a complete list, but it comes really close to what thousands of developers are reading and recommending at the moment, 
                and I have found personally lots of practical examples that can be applied in production sites. dev.to
                Dev.to is a thriving community of developers who write about technology and their lives, trying to help one another out. It has currently got more than 250k registered users and offers a vast list of developer resources for almost any topic. It is what we call “the morning paper” for developers so it also contains lots of new resources for React.js.`,
    createdAt: "15/08/2021",
    owner: {
      username: "Dimo",
    },
    entries: [],
  },
  {
    id: 8,
    title: "Creating multiline strings in JavaScript",
    content: `
    Update:
    
    ECMAScript 6 (ES6) introduces a new type of literal, namely template literals. They have many features, variable interpolation among others, but most importantly for this question, they can be multiline.
    
    A template literal is delimited by backticks:
    
    var html = '
      <div>
        <span>Some HTML here</span>
      </div>
    ';
    
    (Note: I'm not advocating to use HTML in strings)
    
    Browser support is OK, but you can use transpilers to be more compatible.
    Original ES5 answer:
    
    Javascript doesn't have a here-document syntax. You can escape the literal newline, however, which comes close:
    
    "foo \
    bar"
    
    Share
    Improve this answer
    Follow
    edited Feb 14 '18 at 16:47
    Andy Mercer
    5,76566 gold badges4242 silver badges8080 bronze badges
    answered Apr 30 '09 at 2:15
    Anonymous
    43.7k11 gold badge2323 silver badges1919 bronze badges
    
        259
        Be warned: some browsers will insert newlines at the continuance, some will not. – staticsan Apr 30 '09 at 2:22
        40
        Visual Studio 2010 seems to be confused by this syntax as well. – jcollum Apr 17 '11 at 21:58
        52
        @Nate It is specified in ECMA-262 5th Edition section 7.8.4 and called LineContinuation : "A line terminator character cannot appear in a string literal, except as part of a LineContinuation to produce the empty character sequence. The correct way to cause a line terminator character to be part of the String value of a string literal is to use an escape sequence such as \n or \u000A." – some Sep 25 '12 at 2:28
        20
        I don't see why you'd do this when browsers treat it inconsistently. "line1\n" + "line2" across multiple lines is readable enough and you're guaranteed consistent behavior. – SamStephens Mar 20 '13 at 20:14
    `,
    createdAt: "12/10/2020",
    owner: {
      username: "Dimo",
    },
    entries: [],
  },
  {
    id: 9,
    title: "Top React Native Blogs, Newsletters, and Online Communities",
    content: `Keeping up with the world of React and React Native can be a tough job. You need to have a reliable set of React and React Native blogs or content sources to stay up-to-date with all of the news, updates, and announcements in React.

    That’s why we’ve compiled a list of the top React and React Native online communities including React and React Native blogs, newsletters, podcasts, social media groups, and more, for you to stay up-to-date with all that’s new in the world of React and React Native.
    
    Please note that the React and React Native blogs and communities listed below are only the ones that are currently active. While there are many other groups, some of their content is outdated, which is why they weren’t included.
  
    David Walsh Blog`,
    createdAt: "12/08/2021",
    owner: {
      username: "Dimo",
    },
    entries: [],
  },
  {
    id: 10,
    title: "Title 10",
    content: `Tutorials and how-to guides are a great way to engage your audience and educate them in a single blog post. Plus, they’re easy to work on too since you’re already familiar with the topic.

    The key thing to remember when writing how-to guides is to break things down into small actionable steps. This makes it easier for readers to follow your instructions. Including step-by-step screenshots further aids in this, especially for visual learners.
    
    Marketing bloggers could write tutorials on how to use different social media platforms. Beauty bloggers can guide their readers through makeup applications. It all depends on your target audience and what they want to read.
    
    Here’s an example from YourCreativeAura.com: How To Write A Song: Songwriting Basics, this post is broken into the 5 main sections of song creation, along with imagery and examples to make it easier for beginners to understand.`,
    createdAt: "15/08/2021",
    owner: {
      username: "Dimo",
    },
    entries: [],
  },
  {
    id: 11,
    title: "Video tutorials",
    content: `If writing full guides on a subject seems too daunting for you, you can always create a video tutorial instead. Video is hugely popular – sometimes more popular than the written word, so utilising it in your blog makes a lot of sense.

    Your options for video tutorials include:
    
        Filming yourself explaining things
        Filming a screencast of you performing the tutorial steps
        Filming a screencast with a voice-over explaining as you go through the steps.
    
    When posting your tutorial to your blog, you can either host the video directly on your website by uploading it. Or, you could upload it to a video hosting site like YouTube or Vimeo and embed it in a blog post on your site.
    4. Checklists
    
    A checklist is one of the simplest types of content you can publish. We’ve all written a check-list or to-do list before and they work because they’re short, easy to digest and allow the ability to cross items off as you complete them.
    
    Translating this into a blog post is the same thing. Simply post your checklist with some supporting information.
    
    Gardening bloggers could post a checklist for planting in the spring or getting your garden ready for winter. On the other hand, interior bloggers can create a spring cleaning checklist.`,
    createdAt: "11/04/2021",
    owner: {
      username: "Dimo",
    },
    entries: [],
  },
  {
    id: 12,
    title: "Title 12",
    content: "Content 12",
    createdAt: "11/02/2021",
    owner: {
      username: "Dimo",
    },
    entries: [],
  },
];
