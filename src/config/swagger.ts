import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
	swaggerDefinition: {
		openapi: "3.0.2",
		tags: [
			{
				name: "Products",
				description: "API operations related to products",
			},
		],
		info: {
			title: "REST API Node.js / Express / Typescript",
			version: "1.0.0",
			description: "API docs for products",
		},
	},
	apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
	customCss: `
        .topbar {
            background-color: #74EBD5;
            background-image: linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%);
        }
        .topbar-wrapper .link {
            content: url("https://cdn-icons-png.flaticon.com/512/10169/10169718.png");
            height: 200px;
            width: auto;
        }
    `,
	customSiteTitle: "Documentacion REST API Express / Typescript",
};
export default swaggerSpec;
export { swaggerUiOptions };
