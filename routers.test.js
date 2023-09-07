process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
const items = require('./fakeDb');

let entry = {name: "popsicle", price: 1.45}

beforeEach(function() {
    items.push(entry);
});

afterEach(function() {
    items.length = 0;
})

describe("GET /items", function() {
    test("Get a list of items"), async function() {
        const resp = await request(app).get(`/cats`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({item: [entry]});
    }
});

describe("GET /items/:name", function() {
    test("Gets a item", async function() {
      const resp = await request(app).get(`/items/${entry.name}`);
      expect(resp.statusCode).toBe(200);
  
      expect(resp.body).toEqual({item: entry});
    });
  
    test("Responds with 404 if can't find", async function() {
      const resp = await request(app).get(`/items/0`);
      expect(resp.statusCode).toBe(404);
    });
  });

describe("POST /items", function() {
    test("Creates a new item", async function() {
      const resp = await request(app)
        .post(`/items`)
        .send({
          name: "cherrios",
          price: 1.55
        });
      expect(resp.statusCode).toBe(201);
      expect(resp.body).toEqual({
        item: { name: "cherrios", price: 1.55  }
      });
    });
  });

describe("PATCH /items/:name", function() {
    test("Updates a single item", async function() {
      const resp = await request(app)
        .patch(`/items/${entry.name}`)
        .send({
          name: "new popsicle"
        });
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({
        item: { name: "new popsicle", price: 1.45 }
      });
    });
  
    test("Responds with 404 if name invalid", async function() {
      const resp = await request(app).patch(`/items/0`);
      expect(resp.statusCode).toBe(404);
    });
  });

  describe("DELETE /items/:name", function() {
    test("Deletes a single item", async function() {
      const resp = await request(app).delete(`/items/${entry.name}`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({ message: "Deleted" });
    });
  });