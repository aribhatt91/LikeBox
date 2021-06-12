import React, {Fragment} from "react";
import { Link } from 'react-router-dom';

const FAQS = [
    {
        q: "Can I purchase clothes on the site?",
        a: <Fragment>
                <p>
                    Currently you can browse items and click through to the brand website to complete your purchase.
                </p>
            </Fragment>
    },
    {
        q: "How much does it cost to create an account?",
        a: <Fragment><p>A Likebox account is completely FREE.</p></Fragment>
    },
    {
        q: "What happens when I ‘like’ something?",
        a: <Fragment>
                <p>
                    When you like or dislike an item Likebox gets a better understanding of your individual preferences, in the same way that a personal shopper would do. This information is what we use to ensure that you’re only shown items that you will love.
                </p>
            </Fragment>
    },
    {
        q: "What brands do you have?",
        a: <Fragment>
                <p>
                    Our list of brands is constantly expanding and we’re always open to hearing what our customers want so if you have a brand that you’d like to see on Likebox then email us at <a href="mailto:support@likebox.co.uk">support@likebox.co.uk</a>
                </p>
            </Fragment>
    },
    {
        q: "Will the recommendations understand my style and preferences? ",
        a: <Fragment>
                <p>
                    LikeBox gets to know your individual style and preferences during the sign-up process and the more information you provide the better our recommendations will be.
                </p>
                <p>
                    We advise that you swipe through at least 20 products during the sign-up, however you can always come back to this later.
                </p>
                <p>
                    The sign-up process only takes 5 minutes so <Link to='/register'>set-up your free account now.</Link>
                </p>
            </Fragment>
    },
    {
        q: "Do you ship to my area?",
        a: <Fragment>
                Our brands ship to all parts of the UK and some may even ship internationally.
            </Fragment>
    },
    {
        q: "How can I trust the sizing suggestions that you make?",
        a: <Fragment>
                <p>Likebox continues to learn about your individual size and body shape to mould the perfect outfits to you.</p>
                <p>When you create your account, we advise including as much detailed sizing information as possible so that our sizing suggestions are as accurate as possible.</p>
            </Fragment>
    },
    {
        q: "Why would I want a computer to tell me what to wear?",
        a: <Fragment>
                <p>You make all the decisions around what you wear; Likebox simply makes it easier to identify those perfect items.</p>
            </Fragment>
    }
];

export default FAQS;