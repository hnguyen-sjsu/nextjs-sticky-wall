import { g, auth, config } from '@grafbase/sdk'

// @ts-ignore
const User = g
    .model('User', {
        name: g.string().length({ min: 2, max: 100 }),
        email: g.string().unique(),
        avatarUrl: g.url(),
        description: g.string().length({ min: 2, max: 1000 }).optional(),
        githubUrl: g.url().optional(),
        linkedinUrl: g.url().optional(),
        notes: g
            .relation(() => Note)
            .list()
            .optional(),
    })
    .auth((rules) => {
        rules.public().read()
    })

// @ts-ignore
const Note = g
    .model('Note', {
        title: g.string().length({ min: 3 }),
        content: g.string(),
        isCompleted: g.boolean(),
        createdBy: g.relation(() => User),
    })
    .auth((rules) => {
        rules.private().create().delete().update()
    })

const jwt = auth.JWT({
    issuer: 'grafbase',
    secret: g.env('NEXTAUTH_SECRET'),
})

export default config({
    schema: g,
    auth: {
        providers: [jwt],
        rules: (rules) => rules.private(),
    },
})
