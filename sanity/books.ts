import { defineType } from "sanity"

 const  postType = defineType(
    {
        name: 'books',
        type: 'document',
        title: 'Books',
        fields: [
            {
                name: 'name',
                type: 'string',
                title: 'Name'
            },
            {
                name: 'price',
                type: 'number',
                title: 'price'
            },
            {
                name: 'description',
                type: 'text',
                title: 'Description',
                // of: [
                //   {
                //     type: 'block',
                //     styles: [
                //       { title: 'Normal', value: 'normal' },
                //       { title: 'Heading 1', value: 'h1' },
                //       { title: 'Heading 2', value: 'h2' },
                //       { title: 'Heading 3', value: 'h3' },
                //     ],
                //     marks: {
                //       decorators: [
                //         { title: 'Bold', value: 'strong' },
                //         { title: 'Italic', value: 'em' },
                //         { title: 'Underline', value: 'underline' },
                //       ],
                //     },
                //   },
                // ],
              },
            {
                name: "imageUrl",
                type: "image",
                title: "image"
            }
        ]
    }
) 
export default postType