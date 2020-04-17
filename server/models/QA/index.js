const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['18.217.30.3'],
  localDataCenter: 'datacenter1',
  keyspace: 'questions_answers',
});

module.exports = {
  getQuestions: (product_id) => {
    const query = `SELECT product_id, question_id, asker_email, asker_name, body, date_written, helpful, reported\
                   FROM questions_by_product_id\
                   WHERE product_id = ${product_id}`;

    return client.execute(query);
  },

  getAnswers: (question_id) => {
    const query = `SELECT question_id, answer_id, answerer_email, answerer_name, body, date_written, helpful, photos, reported\
                   FROM answers_by_question_id\
                   WHERE question_id = ${question_id}`;

    return client.execute(query);
  },

  postQuestion: (product_id, body, name, email) => {
    const today = new Date();
    const date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    let question_id = parseInt(Date.now() / 1000);
    const query = `INSERT INTO questions_by_product_id (product_id, question_id, body,
                   date_written, asker_name, helpful, reported, asker_email)\ 
                   VALUES (${product_id}, ${question_id}, '${body}', '${date}', '${name}', 0, false, '${email}')`;
    return client.execute(query);
  },

  postAnswer: (question_id, body, name, email, photos) => {
    const today = new Date();
    const date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    let answer_id = parseInt(Date.now() / 1000);

    // let photoArr = [];
    // for (photo of photos) {
    //   let photo_type = { id: null, url: '' };
    //   (photo_type.id = answer_id), (photo_type.url = photo);
    //   photoArr.push(photo_type);
    // }
    // photoArr = JSON.stringify(photoArr);

    const query = `INSERT INTO answers_by_question_id (question_id, answer_id, body,
                   date_written, answerer_name, helpful, reported, answerer_email)\ 
                   VALUES (${question_id}, ${answer_id}, '${body}', '${date}', '${name}', 0, false, '${email}')`;
    return client.execute(query);
  },

  helpfulQuestion: (question_id) => {
    const getQuery = `SELECT product_id FROM p_by_q WHERE question_id=${question_id}`;
    return client.execute(getQuery).then(({ rows }) => {
      let product_id = rows[0].product_id;
      const helpfulQuery = `SELECT helpful FROM questions_by_product_id\
                            WHERE product_id=${product_id} AND question_id=${question_id}`;
      client.execute(helpfulQuery).then(({ rows }) => {
        let helpful = rows[0].helpful + 1;
        const addQuery = `UPDATE questions_by_product_id\
                          SET helpful = ${helpful}\
                          WHERE product_id=${product_id} AND question_id=${question_id}`;
        return client.execute(addQuery);
      });
    });
  },

  reportQuestion: (question_id) => {
    const getQuery = `SELECT product_id FROM p_by_q WHERE question_id=${question_id}`;
    return client.execute(getQuery).then(({ rows }) => {
      let product_id = rows[0].product_id;
      const query = `UPDATE questions_by_product_id SET reported = true\
                     WHERE product_id=${product_id} AND question_id=${question_id}`;
      return client.execute(query);
    });
  },

  helpfulAnswer: (answer_id) => {
    const getQuery = `SELECT question_id FROM q_by_a WHERE answer_id=${answer_id}`;
    return client.execute(getQuery).then(({ rows }) => {
      let question_id = rows[0].question_id;
      const helpfulQuery = `SELECT helpful FROM answers_by_question_id\
                            WHERE question_id=${question_id} AND answer_id=${answer_id}`;
      client.execute(helpfulQuery).then(({ rows }) => {
        let helpful = rows[0].helpful + 1;
        const addQuery = `UPDATE answers_by_question_id\
                          SET helpful = ${helpful}\
                          WHERE question_id=${question_id} AND answer_id=${answer_id}`;
        return client.execute(addQuery);
      });
    });
  },

  reportAnswer: (answer_id) => {
    const getQuery = `SELECT question_id FROM q_by_a WHERE answer_id=${answer_id}`;
    return client.execute(getQuery).then(({ rows }) => {
      let question_id = rows[0].question_id;
      const query = `UPDATE answers_by_question_id SET reported = true\
                     WHERE question_id=${question_id} AND answer_id=${answer_id}`;
      return client.execute(query);
    });
  },
};
