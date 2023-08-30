## Documentación de la Aplicación Backend

¡Bienvenido a la documentación oficial del backend para la aplicación de monitoreo de usuarios en una plataforma! Aquí encontrarás todos los detalles necesarios para comprender, desarrollar y desplegar el backend de manera efectiva.

### Introducción

Esta documentación detalla el backend para la aplicación de monitoreo de usuarios en una plataforma. El objetivo principal de esta aplicación es registrar el comportamiento de los usuarios, sus interacciones y asociarlos a diferentes países. Además, se aplican niveles de acceso a la información según el rol de cada usuario. La tecnología utilizada incluye Node.js, GraphQL, Prisma, PostgreSQL y Docker.

### Requisitos Previos

Antes de comenzar, asegúrate de tener lo siguiente instalado en tu sistema:

- Node.js (versión 16.x recomendada)
- npm (administrador de paquetes de Node.js)
- Docker (opcional, pero recomendado para contenerización)
- Credenciales de acceso a una base de datos PostgreSQL

### Configuración del Entorno

Sigue estos pasos para configurar el entorno de desarrollo:

1. Clona este repositorio.
2. Abre una terminal y navega al directorio raíz del proyecto.
3. Ejecuta `npm install` para instalar todas las dependencias necesarias.
4. Configura la base de datos PostgreSQL actualizando el archivo `.env` con tus credenciales.
5. Genera el cliente Prisma ejecutando `npx prisma generate`.
6. Inicia el servidor de desarrollo con `npm start`.

### Estructura del Proyecto

```
- src/
  - db/
    - schema.prisma
  - graphql/
    - resolvers/
    - typedefs/
    - schema.graphql.
  - services/
  - server/
  - utils/
  - types/
- .env
```

La estructura del proyecto está organizada de manera intuitiva para separar los resolvers, los servicios y los tipos GraphQL. La carpeta `src` contiene todos los componentes principales de la aplicación.

### Tipos GraphQL (TypeDefs)

En esta sección se definen los tipos GraphQL que se utilizan en la aplicación:

#### UserType

```graphql
type User {
  id: String!
  name: String!
  image: String!
  position: String
  email: String!
  createdAt: String!
  updatedAt: String!
  emailVerified: String
  termsAndConditionsAccepted: String
  role: Role!
  countries: [Country!]!
  userMonitoring: [UserMonitoring!]!
}
```

### Resolvers

Los resolvers son funciones que implementan la lógica detrás de las consultas y mutaciones de GraphQL. A continuación, se describen algunos de los resolvers implementados:

#### UserType Resolvers

```javascript
const resolvers = {
  Query: {
    getUserByEmail: async (_: any,{ email }: any, {database}: MyContext) => {
      return await UserService.getUserByEmail(email, database as PrismaClient);
    },
    getAllUsers: async (_: any, __: any, {database}: MyContext): Promise<any> => {
      return await UserService.getAllUsers(database as PrismaClient);
    },
  },
  // ...
};
```

### Servicios

Los servicios encapsulan la lógica de negocio y el acceso a la base de datos. Aquí tienes un ejemplo de un servicio implementado:

#### UserService

```javascript

export default class UserService {
	static async getUserByEmail( email: string, database: PrismaClient) {
		if (!isValidEmail(email)) {
			throw new GraphQLError("Invalid email");
		}
		const user =
			await database.$queryRaw<User[]>`SELECT * FROM "User" WHERE "email" = ${email}`;
		if (!user) {
      throw new GraphQLError("User not found");
		}
		return user[0];
	}
  // ...
}
```

### Consultas y Mutaciones

La aplicación ofrece consultas y mutaciones GraphQL para interactuar con los datos. Aquí hay un ejemplo de una consulta implementada:

#### Consulta: getUserByEmail

```graphql
type Query {
  getUserByEmail(email: String!): User
}
```

### Autenticación y Autorización

La autenticación se basa en tokens enviados en los headers de las solicitudes GraphQL. La autorización se controla según el rol del usuario en cada resolución.

### Despliegue

#### Docker

Si deseas contenerizar tu backend, sigue estos pasos:

1. Crea un archivo llamado `Dockerfile` en la raíz del proyecto y copia el contenido proporcionado en la sección anterior.
2. Abre una terminal y navega al directorio del proyecto.
3. Ejecuta `docker build -t my-backend-app .` para construir la imagen de Docker.
4. Ejecuta `docker run -p 3000:3000 my-backend-app` para ejecutar el contenedor.

### Contribución

¡Agradecemos tu interés en contribuir! Sigue estos pasos para enviar tus cambios:

1. Clona el repositorio.
2. Crea una rama descriptiva con `git checkout -b nombre-descriptivo`.
3. Realiza tus cambios y pruebas.
4. Envía un pull request a la rama principal.

### Contacto y Soporte

Si tienes preguntas o necesitas soporte, no dudes en contactarnos en [brandon.velasquez.osorio@gmail.com].

### Notas de Seguridad

Por razones de seguridad, nunca compartas las credenciales de la base de datos en el repositorio. Mantén tus claves seguras.

### Ejemplos de Código

Aquí tienes un ejemplo de cómo se realiza una consulta GraphQL:

```graphql
query {
  getUserByEmail(email: "usuario@ejemplo.com") {
    id
    email
    role {
      name
    }
  }
}
```

### Conclusión

Esta documentación proporciona una guía completa para desarrollar y desplegar el backend de la aplicación de monitoreo de usuarios. Asegúrate de mantenerla actualizada a medida que el proyecto evoluciona y crece.