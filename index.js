const express = require('express')
const Sequelize = require('sequelize')

const app = express()
const port = 3000

const sequelize = new Sequelize('postgresql://configmaster:nemiskellaz@localhost:5433/configmaster')
sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const Component = sequelize.define('component', 
    {
        name: { 
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    { 
        indexes: [
            {
                unique: true,
                fields: ['name']
            },
        ],
    }
)

const Parameter = sequelize.define('parameter',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        value: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    { 
        indexes: [
            {
                unique: true,
                fields: ['name', 'componentId']
            },
        ],
    }
)

Component.hasMany(Parameter)
Parameter.belongsTo(Component);

// The sync seams to delete the entire db
const modelConf = { alter: true}
//const modelConf = { force: true}
Component.sync(modelConf);
Parameter.sync(modelConf);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!'})
})

app.post('/component', async (req, res) => {
    try {
        const newComponent = new Component(req.body);
        await newComponent.save();
        res.json({ status: "OK" })
    } catch (error) {
        console.log(error)
    }
})

app.get('/component/:componentName', async (req, res) => {
    const componentName = req.params.componentName;
    try {
        const component = await Component.findOne({
            where: {
                name: componentName,
            }
        })
        res.json({ component })
    } catch (error) {
        console.log(error)
    }
})

app.get('/components/', async (req, res) => {
    try {
        const components = await Component.findAll({})
        res.json({ components })
    } catch (error) {
        console.log(error)
    }
})

app.post('/parameter/:componentName', async (req, res) => {
    const componentName = req.params.componentName;
    console.log(req.body);
    try {
        const component = await Component.findOne({
            where: {
                name: componentName,
            }
        });
        const newParameter = await component.createParameter(req.body);
        console.log(newParameter);
        await newParameter.save();
        res.json({ status: "OK" })
    } catch (error) {
        console.log(error)
    }
})

app.get('/parameter/:componentName/:parameterName', async (req, res) => {
    const componentName = req.params.componentName;
    const parameterName = req.params.parameterName;
    try {
        const component = await Component.findOne({
            where: {
                name: componentName,
            }
        })
        const parameters = await component.getParameters({
            where: {
                name: parameterName
            }
        })
        const parameter = parameters[0];
        res.json({ parameter })
    } catch (error) {
        console.log(error)
    }
})

app.get('/parameters/:componentName', async (req, res) => {
    const componentName = req.params.componentName;
    try {
        const component = await Component.findOne({
            where: {
                name: componentName,
            }
        })
        const parameters = await component.getParameters()
        res.json({ parameters })
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});