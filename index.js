require('dotenv').config();
const _ = require('lodash');
const { WebClient } = require('@slack/client');
const schedule = require('node-schedule');
// An access token (from your Slack app or custom integration - xoxa, xoxp, or xoxb)
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const channel = 'CDK77MXHN';

// // XXX: 0. Full Async/Await Stupid Mode
// const getRandomUserIdFromChannel = async (channel) =>
//   _.sample((await web.channels.info({ channel })).channel.members);
//
// const getUserInfoById = async (user) => (await web.users.info({ user })).user;
//
// const greetUserInChannel = async (user, channel) => {
//   const { id, real_name } = user;
//   let res = await web.chat.postMessage({
//     channel,
//     text: `Random Hello there from Slack SKD <@${id}>, ${real_name} is Awesome!`,
//   });
//
//   console.log('Message sent: ', res);
// };
//
// const greetRandomUserInChannel = async (channel) => {
//   await greetUserInChannel(
//     await getUserInfoById(await getRandomUserIdFromChannel(channel)),
//     channel,
//   );
// };
//
// 1.XXX: Full Async/Await
const getRandomUserIdFromChannel = async (channel) => {
  let res = await web.channels.info({ channel });
  return _.sample(res.channel.members);
};

const getUserInfoById = async (user) => {
  let res = await web.users.info({ user });
  return res.user;
};

const greetUserInChannel = async (user, channel) => {
  const { id, real_name } = user;
  let res = await web.chat.postMessage({
    channel,
    text: `Random Hello there from Slack SKD <@${id}>, ${real_name} is Awesome!`,
  });

  console.log('Message sent: ', res);
};

const greetRandomUserInChannel = async (channel) => {
  let userId = await getRandomUserIdFromChannel(channel);
  let user = await getUserInfoById(userId);
  await greetUserInChannel(user, channel);
};
//
// // 2.XXX: Half Baked Async/Await
// const getRandomUserIdFromChannel = async (channel) => {
//   return web.channels // line break
//     .info({ channel })
//     .then((res) => {
//       return _.sample(res.channel.members);
//     });
// };
//
// const getUserInfoById = async (user) => {
//   return web.users // line break
//     .info({ user })
//     .then((res) => {
//       return res.user;
//     });
// };
//
// const greetUserInChannel = async (user, channel) => {
//   const { id, real_name } = user;
//   return web.chat
//     .postMessage({
//       channel,
//       text: `Random Hello there from Slack SKD <@${id}>, ${real_name} is Awesome!`,
//     })
//     .then((res) => {
//       console.log('Message sent: ', res);
//     });
// };
//
// const greetRandomUserInChannel = async (channel) => {
//   let userId = await getRandomUserIdFromChannel(channel);
//   let user = await getUserInfoById(userId);
//   await greetUserInChannel(user, channel);
// };
//
// // 3. XXX: Promise Chain
// const getRandomUserIdFromChannel = (channel) => {
//   return web.channels // line break
//     .info({ channel })
//     .then((res) => {
//       return _.sample(res.channel.members);
//     });
// };
//
// const getUserInfoById = (user) => {
//   return web.users // line break
//     .info({ user })
//     .then((res) => {
//       return res.user;
//     });
// };
//
// const greetUserInChannel = (user, channel) => {
//   const { id, real_name } = user;
//   return web.chat
//     .postMessage({
//       channel,
//       text: `Random Hello there from Slack SKD <@${id}>, ${real_name} is Awesome!`,
//     })
//     .then((res) => {
//       console.log('Message sent: ', res);
//     });
// };
//
// const greetRandomUserInChannel = (channel) => {
//   getRandomUserIdFromChannel(channel)
//     .then(getUserInfoById)
//     .then((userId) => {
//       return greetUserInChannel(userId, channel);
//     })
//     .catch(console.error);
// };
//
// // 4. XXX: Long Unreasonable Chain
// const longUnreasonableChain = (channel) =>
//   web.channels
//     .info({ channel })
//     .then((res) => _.sample(res.channel.members))
//     .then((user) =>
//       web.users // line break
//         .info({ user })
//         .then((res) => res.user)
//         .then(({ id, real_name } = user) =>
//           web.chat // line break
//             .postMessage({
//               channel,
//               text: `Random Hello there from Slack SKD <@${id}>, ${real_name} is Awesome!`,
//             })
//             .then((res) => {
//               console.log('Message sent: ', res);
//             })
//             .catch(console.error),
//         )
//         .catch(console.error),
//     )
//     .catch(console.error);

// FIRE!
greetRandomUserInChannel(channel).catch(console.error);
// longUnreasonableChain(channel);
