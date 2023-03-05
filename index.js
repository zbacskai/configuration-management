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

const SystemDef = sequelize.define('systemdef', {
    system_id: { 
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

// The sync seams to delete the entire db
// SystemDef.sync({ force: true});

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!'})
})

app.post('/systemdef', async (req, res) => {
    try {
        const newSysDef = new SystemDef(req.body);
        await newSysDef.save();
        res.json({ status: "OK" })
    } catch (error) {
        console.log(error)
    }
})

app.get('/systemdef/:systemId', async (req, res) => {
    const systemId = req.params.systemId;
    try {
        const sysDef = await SystemDef.findAll({
            where: {
                system_id: systemId
            }
        })
        res.json({ sysDef })
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});