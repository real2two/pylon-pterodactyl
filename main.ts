const prefix = '!';
const color = 0x0000fe; // start with "0x" then the color code
const footername = 'Pterodactyl Discord Bot';
const footerimage = 'https://revenact.io/data/resource_icons/0/231.jpg';
const panellink = 'Panel Link Here';
const sharedapi = null;
const sharedfocus = null;
const disablelinkscmd = 0;
const zerodiskmsg = '∞ MB';
const zerorammsg = '∞ MB';
const cputype = 0;
const checkpower = 0;
const checksend = 0;

const errorsetapiembed = new discord.Embed()
  .setTitle('You must set an API key!')
  .setColor(color)
  .setDescription(
    'You must set your API key using the `' +
      prefix +
      'setapi <api code>` command before running this command.\n***RUN THE SET API KEY COMMAND IN THE BOTS DMS!!!***'
  )
  .setFooter({
    text: footername,
    iconUrl: footerimage
  });

const argssetapiembed = new discord.Embed()
  .setTitle('Incorrect usage.')
  .setColor(color)
  .setDescription('Please use `' + prefix + 'setapi <api code>` instead!')
  .setFooter({ text: footername, iconUrl: footerimage });

const invalidapicodeembed = new discord.Embed()
  .setTitle('Invalid API code.')
  .setColor(color)
  .setDescription('Please enter a valid API code.')
  .setFooter({ text: footername, iconUrl: footerimage });

const setapicodesuccessembed = new discord.Embed()
  .setTitle('Success!')
  .setColor(color)
  .setDescription('Successfully added your API code to the database.')
  .setFooter({ text: footername, iconUrl: footerimage });

const argsfocusembed = new discord.Embed()
  .setTitle('Incorrect usage.')
  .setColor(color)
  .setDescription('Please use `' + prefix + 'focus <server id>` instead!')
  .setFooter({ text: footername, iconUrl: footerimage });

const invalidfocusembed = new discord.Embed()
  .setTitle('Invalid server ID.')
  .setColor(color)
  .setDescription('Please enter a valid server ID.')
  .setFooter({ text: footername, iconUrl: footerimage });

const focussuccessembed = new discord.Embed()
  .setTitle('Success!')
  .setColor(color)
  .setDescription('Successfully added your server ID to the database.')
  .setFooter({ text: footername, iconUrl: footerimage });

const nodelapiembed = new discord.Embed()
  .setTitle('API key not set.')
  .setColor(color)
  .setDescription('You have not registered an API key to the database.')
  .setFooter({ text: footername, iconUrl: footerimage });

const yesdelapiembed = new discord.Embed()
  .setTitle('Success!')
  .setColor(color)
  .setDescription('The API key has been removed from the database.')
  .setFooter({ text: footername, iconUrl: footerimage });

const nodelfocusembed = new discord.Embed()
  .setTitle('API key not set.')
  .setColor(color)
  .setDescription('You have not registered an API key to the database.')
  .setFooter({ text: footername, iconUrl: footerimage });

const yesdelfocusembed = new discord.Embed()
  .setTitle('Success!')
  .setColor(color)
  .setDescription('The API key has been removed from the database.')
  .setFooter({ text: footername, iconUrl: footerimage });

discord.registerEventHandler('MESSAGE_CREATE', async (message) => {
  try {
    if (
      message.content.startsWith(prefix) &&
      !message.content.startsWith(prefix + ' ')
    ) {
      var fullcmd = message.content.toLowerCase().slice(prefix.length);
      var cmd = fullcmd.split(' ')[0].toString();
      if (fullcmd.startsWith('help ') || fullcmd == 'help') {
        if (sharedfocus == null) {
          var addapioptions =
            '\n`' +
            prefix +
            "setapi` **-** Set your API in the database. *run this command in the bot's dms*\n`" +
            prefix +
            'delapi` **-** Devare the API key from the database.';
        } else {
          addapioptions = '';
        }
        if (sharedfocus == null) {
          var addfocusoptions =
            '\n`' +
            prefix +
            'focus` **-** Focus a server using the server ID.\n`' +
            prefix +
            'delfocus` **-** Devare the focused server from the database.\n`' +
            prefix +
            'listservers` **-** Shows the list of servers you own.';
        } else {
          addfocusoptions = '';
        }
        if (disablelinkscmd == 1) {
          var addlinkscmdoption = '';
        } else {
          addlinkscmdoption =
            '\n`' +
            prefix +
            'links` **-** Shows links to the Pterodactyl panel.';
        }
        var embed = new discord.Embed()
          .setTitle('Help')
          .setColor(color)
          .setDescription(
            '`' +
              prefix +
              'help` **-** The help command.' +
              addlinkscmdoption +
              addapioptions +
              addfocusoptions +
              '\n`' +
              prefix +
              "info` **-** Shows your focused server's information.\n`" +
              prefix +
              'power` **-** Use power signals to the focused server.\n`' +
              prefix +
              'send` **-** Send a message to the focused server.'
          )
          .setFooter({ text: footername, iconUrl: footerimage });
        await message.reply(embed);
        return;
      }
      if (sharedapi == null) {
        if (fullcmd.startsWith('setapi ') || fullcmd == 'setapi') {
          if (fullcmd == 'setapi') {
            message.reply(argssetapiembed);
            return;
          } else {
            if (message.content.slice(7 + prefix.length).length !== 48) {
              message.reply(invalidapicodeembed);
              return;
            } else {
              kv.put(
                'api_' + message.author.id,
                message.content.slice(7 + prefix.length)
              );
              message.reply(setapicodesuccessembed);
              return;
            }
          }
        }
        if (fullcmd.startsWith('delapi ') || fullcmd == 'delapi') {
          if (await kv.get('api_' + message.author.id)) {
            kv.put('api_' + message.author.id, '');
            message.reply(yesdelapiembed);
          } else {
            message.reply(nodelapiembed);
          }
          return;
        }
      }

      if (sharedfocus == null) {
        if (fullcmd.startsWith('focus ') || fullcmd == 'focus') {
          if (fullcmd == 'focus') {
            message.reply(argsfocusembed);
            return;
          } else {
            if (message.content.slice(6 + prefix.length).length !== 8) {
              message.reply(invalidfocusembed);
              return;
            } else {
              kv.put(
                'focus_' + message.author.id,
                message.content.slice(6 + prefix.length)
              );
              message.reply(focussuccessembed);
              return;
            }
          }
        }
        if (fullcmd.startsWith('delfocus ') || fullcmd == 'delfocus') {
          if (await kv.get('focus_' + message.author.id)) {
            kv.put('focus_' + message.author.id, '');
            message.reply(yesdelfocusembed);
          } else {
            message.reply(nodelfocusembed);
          }
          return;
        }
      }

      if (
        fullcmd.startsWith('info ') ||
        fullcmd.startsWith('links ') ||
        fullcmd.startsWith('listservers ') ||
        fullcmd.startsWith('power ') ||
        fullcmd.startsWith('send ') ||
        fullcmd == 'info' ||
        fullcmd == 'links' ||
        fullcmd == 'listservers' ||
        fullcmd == 'power' ||
        fullcmd == 'send'
      ) {
        if ((await kv.get('api_' + message.author.id)) || sharedapi == null) {
          if (sharedapi !== null) {
            var api = sharedapi;
          } else {
            var api = await kv.get('api_' + message.author.id);
          }
          try {
            if (sharedfocus !== null) {
              focused = sharedfocus;
            } else {
              if (await kv.get('focus_' + message.author.id)) {
                var focused = await kv.get('focus_' + message.author.id);
              } else {
                var focused = null;
              }
            }
            if (panellink.slice(-1) == '/') {
              var actualpanellink = panellink.slice(0, -1);
            } else {
              var actualpanellink = panellink;
            }

            if (fullcmd == 'info' || fullcmd.startsWith('info ')) {
              if (focused !== null) {
                var response = await fetch(
                  actualpanellink + '/api/client/servers/' + focused,
                  {
                    method: 'get',
                    headers: {
                      Authorization: 'Bearer ' + api,
                      'Content-Type': 'application/json'
                    }
                  }
                );
                var data = await response.json();
                if (response.status !== 200) {
                  var embed = new discord.Embed()
                    .setTitle('An error has occured.')
                    .setColor(color)
                    .setDescription(
                      'Your API code or/and focused server might be invalid!'
                    )
                    .setFooter({ text: footername, iconUrl: footerimage });
                  message.reply(embed);
                  return;
                } else {
                  var response1 = await fetch(
                    actualpanellink +
                      '/api/client/servers/' +
                      focused +
                      '/utilization',
                    {
                      method: 'get',
                      headers: {
                        Authorization: 'Bearer ' + api,
                        'Content-Type': 'application/json'
                      }
                    }
                  );

                  var data1 = await response1.json();

                  if (response1.status !== 200) {
                    var embed = new discord.Embed()
                      .setTitle('An error has occured.')
                      .setColor(color)
                      .setDescription(
                        'Your API code or/and focused server might be invalid!'
                      )
                      .setFooter({ text: footername, iconUrl: footerimage });
                    message.reply(embed);
                    return;
                  } else {
                    var sea = data1;
                    var status =
                      sea.attributes.state.slice(0, 1).toUpperCase() +
                      sea.attributes.state.slice(1);
                    if (status.slice(status.length - 3) == 'ing')
                      status = status + '...';
                    var currentram = sea.attributes.memory.current;
                    var currentcpu = Math.round(sea.attributes.cpu.current);
                    var currentdisk = sea.attributes.disk.current;
                    var sia = data;
                    var servername = sia.attributes.name;
                    var ram = sia.attributes.limits.memory;
                    if (sia.attributes.server_owner == true) {
                      var relation = 'Owner';
                    } else {
                      var relation = 'Subuser';
                    }
                    if (ram == '0' && zerorammsg !== null) {
                      var rammsg = zerorammsg;
                    } else {
                      var rammsg = ram + 'MB';
                    }
                    var disk = sia.attributes.limits.disk;
                    if (disk == '0' && zerodiskmsg !== null) {
                      var diskmsg = zerodiskmsg;
                    } else {
                      var diskmsg = disk + 'MB';
                    }
                    var cpu = sia.attributes.limits.cpu;
                    var databases = sia.attributes.feature_limits.databases;
                    var allocations = sia.attributes.feature_limits.allocations;
                    if (cputype == 1) {
                      var cputype1 = 'vCores';
                      var cpuamount = Math.round(cpu / 100);
                    } else {
                      cputype1 = 'CPU';
                      var cpuamount = currentcpu.toString() + '%'; // + "/" + cpu + "%"
                    }
                    var embed = new discord.Embed()
                      .setTitle('Server Info | #' + focused)
                      .setUrl(actualpanellink + '/server/' + focused)
                      .setColor(color)
                      .setDescription(
                        '**Server Name**: ' +
                          servername +
                          '\n**Status**: ' +
                          status +
                          '\n**Relation**: ' +
                          relation +
                          '\n**RAM**: ' +
                          currentram +
                          'MB/' +
                          rammsg +
                          '\n**Disk**: ' +
                          currentdisk +
                          'MB/' +
                          diskmsg +
                          `\n**${cputype1}**: ` +
                          cpuamount +
                          '\n**Databases**: ' +
                          databases +
                          '\n**Allocations**: ' +
                          allocations
                      )
                      .setFooter({ text: footername, iconUrl: footerimage });
                    message.reply(embed);
                    return;
                  }
                }
              } else {
                var embed = new discord.Embed()
                  .setTitle('You must focus a server!')
                  .setColor(color)
                  .setDescription(
                    'You must set your focused server using the `' +
                      prefix +
                      'focus` command before running this command.'
                  )
                  .setFooter({ text: footername, iconUrl: footerimage });
                message.reply(embed);
                return;
              }
            } else if (fullcmd.startsWith('links ') || fullcmd == 'links') {
              if (focused == null) {
                var embed = new discord.Embed()
                  .setTitle('Links')
                  .setColor(color)
                  .setDescription(
                    '> `Account Options`\n**Panel/Servers**: ' +
                      panellink +
                      '\n**Account Page**: ' +
                      panellink +
                      '/account\n**Security Options**: ' +
                      panellink +
                      '/account/security\n**Account API**: ' +
                      panellink +
                      '/account/api\n> `Server Options`\nYou must focus a server to see the server option links.'
                  )
                  .setFooter({ text: footername, iconUrl: footerimage });
                message.reply(embed);
                return;
              } else {
                var serverdir = actualpanellink + '/server/' + focused + '/';
                var embed = new discord.Embed()
                  .setTitle('Links')
                  .setColor(color)
                  .setDescription(
                    '> `Account Options`\n**Panel/Servers**: ' +
                      panellink +
                      '\n**Account Page**: ' +
                      panellink +
                      '/account\n**Security Options**: ' +
                      panellink +
                      '/account/security\n**Account API**: ' +
                      panellink +
                      '/account/api\n> `Server Options`\n**Console**: ' +
                      serverdir +
                      '\n**Console Only**: ' +
                      serverdir +
                      'console\n**File Management**: ' +
                      serverdir +
                      'files\n**Subusers**: ' +
                      serverdir +
                      'users\n' +
                      '**Schedule Manager**: ' +
                      serverdir +
                      'schedules\n**Databases**: ' +
                      serverdir +
                      'databases\n**Server Name**: ' +
                      serverdir +
                      'settings/name\n**Server Allocations**: ' +
                      serverdir +
                      'settings/allocation\n**SFTP Settings**: ' +
                      serverdir +
                      'settings/sftp\n**Startup Parameters**: ' +
                      serverdir +
                      'settings/startup'
                  )
                  .setFooter({ text: footername, iconUrl: footerimage });
                message.reply(embed);
                return;
              }
            } else if (
              fullcmd.startsWith('listservers ') ||
              fullcmd == 'listservers'
            ) {
              var response = await fetch(actualpanellink + '/api/client', {
                method: 'get',
                headers: {
                  Authorization: 'Bearer ' + api,
                  'Content-Type': 'application/json'
                }
              });
              if (response.status !== 200) {
                var embed = new discord.Embed()
                  .setTitle('An error has occured.')
                  .setColor(color)
                  .setDescription('Your API code might be invalid!')
                  .setFooter({ text: footername, iconUrl: footerimage });
                message.reply(embed);
                return;
              } else {
                var embed = new discord.Embed()
                  .setTitle(`Your Servers`)
                  .setUrl(actualpanellink)
                  .setColor(color)
                  .setFooter({ text: footername, iconUrl: footerimage });
                var lsa = await response.json();
                var loopnum = 0;
                var maxram = [];
                var maxdisk = [];
                var relation1 = [];
                while (loopnum < lsa.data.length) {
                  if (
                    lsa.data[loopnum].attributes.limits.memory == 0 &&
                    zerorammsg !== null
                  ) {
                    maxram[loopnum] = zerorammsg;
                  } else {
                    maxram[loopnum] =
                      lsa.data[loopnum].attributes.limits.memory + 'MB';
                  }
                  if (
                    lsa.data[loopnum].attributes.limits.disk == 0 &&
                    zerodiskmsg !== null
                  ) {
                    maxdisk[loopnum] = zerodiskmsg;
                  } else {
                    maxdisk[loopnum] =
                      lsa.data[loopnum].attributes.limits.disk + 'MB';
                  }
                  if (lsa.data[loopnum].attributes.server_owner == true) {
                    relation1[loopnum] = 'Owner';
                  } else {
                    relation1[loopnum] = 'Subuser';
                  }
                  embed.addField({
                    name: lsa.data[loopnum].attributes.name,
                    value:
                      '**Link**: ' +
                      actualpanellink +
                      '/server/' +
                      lsa.data[loopnum].attributes.identifier +
                      '\n**ID**: `#' +
                      lsa.data[loopnum].attributes.identifier +
                      '`\n**Relation**: ' +
                      relation1[loopnum] +
                      '\n```RAM: ' +
                      maxram[loopnum] +
                      '\nDisk: ' +
                      maxdisk[loopnum] +
                      '\n```',
                    inline: true
                  });
                  var loopnum = loopnum + 1;
                }
                if (lsa.data.length == 0) {
                  embed.setDescription('You do not own any servers.');
                }
                message.reply(embed);
                return;
              }
            } else if (fullcmd == 'power' || fullcmd.startsWith('power ')) {
              var poweronaction = false;
              if (focused !== 'none') {
                if (message.content.toLowerCase() === prefix + 'power') {
                  var embed = new discord.Embed()
                    .setTitle('Invalid usage.')
                    .setColor(color)
                    .setDescription(
                      'Please use `' +
                        prefix +
                        'power <start/stop/restart/kill>` instead.'
                    )
                    .setFooter({ text: footername, iconUrl: footerimage });
                  message.reply(embed);
                  return;
                }

                var type = message.content
                  .toLowerCase()
                  .slice(6 + prefix.length);

                if (
                  type == 'start' ||
                  type == 'stop' ||
                  type == 'restart' ||
                  type == 'kill'
                ) {
                } else {
                  var embed = new discord.Embed()
                    .setTitle('Invalid power signal.')
                    .setColor(color)
                    .setDescription(
                      'Please use `' +
                        prefix +
                        'power <start/stop/restart/kill>` instead.'
                    )
                    .setFooter({ text: footername, iconUrl: footerimage });
                  message.reply(embed);
                  return;
                }

                if (checkpower == 1) {
                  var response = await fetch(
                    panellink +
                      '/api/client/servers/' +
                      focused +
                      '/utilization',
                    {
                      method: 'get',
                      headers: {
                        Authorization: 'Bearer ' + api,
                        'Content-Type': 'application/json'
                      }
                    }
                  );
                  if (response.status !== 200) {
                    var embed = new discord.Embed()
                      .setTitle('An error has occured.')
                      .setColor(color)
                      .setDescription(
                        'Your API code or/and focused server might be invalid!'
                      )
                      .setFooter({ text: footername, iconUrl: footerimage });
                    message.reply(embed);
                    return;
                  } else {
                    var sea = await response.json();
                    var status = sea.attributes.state;
                    if (status == 'on' || status == 'starting') {
                      if (type == 'start') {
                        var embed = new discord.Embed()
                          .setTitle('Already ' + status + '!')
                          .setColor(color)
                          .setDescription(
                            'The server is already ' + status + '.'
                          )
                          .setFooter({
                            text: footername,
                            iconUrl: footerimage
                          });
                        message.reply(embed);
                        return;
                      } else {
                        var poweronaction = true;
                      }
                    } else if (status == 'stopping' || status == 'off') {
                      if (
                        type == 'stop' ||
                        (type == 'kill' && status == 'off')
                      ) {
                        var embed = new discord.Embed()
                          .setTitle('Already ' + status + '!')
                          .setColor(color)
                          .setDescription(
                            'The server is already ' + status + '.'
                          )
                          .setFooter({
                            text: footername,
                            iconUrl: footerimage
                          });
                        message.reply(embed);
                        return;
                      } else if (type == 'restart') {
                        var embed = new discord.Embed()
                          .setTitle('Server is ' + status + '!')
                          .setColor(color)
                          .setDescription(
                            'Do you mean to `' +
                              prefix +
                              'power start` instead?'
                          )
                          .setFooter({
                            text: footername,
                            iconUrl: footerimage
                          });
                        message.reply(embed);
                        return;
                      } else {
                        var poweronaction = true;
                      }
                    }
                  }
                } else {
                  var poweronaction = true;
                }
              } else {
                var embed = new discord.Embed()
                  .setTitle('You must focus a server!')
                  .setColor(color)
                  .setDescription(
                    'You must set your focused server using the `' +
                      prefix +
                      'focus` command before running this command.'
                  )
                  .setFooter({ text: footername, iconUrl: footerimage });
                message.reply(embed);
                return;
              }
              if (poweronaction == true) {
                var response1 = await fetch(
                  panellink + '/api/client/servers/' + focused + '/power',
                  {
                    method: 'post',
                    headers: {
                      Authorization: 'Bearer ' + api,
                      'Content-Type': 'application/json'
                    },
                    body: `{ "signal": "${type}" }`
                  }
                );

                if (response1.status !== 204) {
                  var embed = new discord.Embed()
                    .setTitle('An error has occured.')
                    .setColor(color)
                    .setDescription(
                      'Your API code or/and focused server might be invalid!'
                    )
                    .setFooter({ text: footername, iconUrl: footerimage });
                  message.reply(embed);
                  return;
                } else {
                  var type = type.replace('stop', 'stopp');
                  if (checkpower == 1) {
                    var add = '';
                  } else {
                    var add = ', if not already';
                  }
                  var embed = new discord.Embed()
                    .setTitle('Success!')
                    .setColor(color)
                    .setDescription(`Successfully ${type}ed the server${add}.`)
                    .setFooter({ text: footername, iconUrl: footerimage });
                  message.reply(embed);
                  return;
                }
              }
            } else if (fullcmd == 'send' || fullcmd.startsWith('send ')) {
              var poweron = false;
              if (focused !== 'none') {
                if (message.content.toLowerCase() === prefix + 'send') {
                  var embed = new discord.Embed()
                    .setTitle('Invalid usage.')
                    .setColor(color)
                    .setDescription(
                      'Please use `' + prefix + 'send <command>` instead.'
                    )
                    .setFooter({ text: footername, iconUrl: footerimage });
                  message.reply(embed);
                  return;
                }

                if (checksend == 1) {
                  var response = await fetch(
                    panellink +
                      '/api/client/servers/' +
                      focused +
                      '/utilization',
                    {
                      method: 'get',
                      headers: {
                        Authorization: 'Bearer ' + api,
                        'Content-Type': 'application/json'
                      }
                    }
                  );

                  if (response.status !== 200) {
                    var embed = new discord.Embed()
                      .setTitle('An error has occured.')
                      .setColor(color)
                      .setDescription(
                        'Your API code or/and focused server might be invalid!'
                      )
                      .setFooter({ text: footername, iconUrl: footerimage });
                    message.reply(embed);
                    return;
                  } else {
                    var sea = await response.json();
                    var status = sea.attributes.state;
                    if (status == 'stopping' || status == 'off') {
                      var embed = new discord.Embed()
                        .setTitle('Server is off')
                        .setColor(color)
                        .setDescription(
                          `You cannot run commands when the server is off.\nDid you mean to run \`${prefix}power start\`?`
                        )
                        .setFooter({ text: footername, iconUrl: footerimage });
                      message.reply(embed);
                      return;
                    } else {
                      var poweron = true;
                    }
                  }
                } else {
                  var poweron = true;
                }
              } else {
                var embed = new discord.Embed()
                  .setTitle('You must focus a server!')
                  .setColor(color)
                  .setDescription(
                    'You must set your focused server using the `' +
                      prefix +
                      'focus` command before running this command.'
                  )
                  .setFooter({ text: footername, iconUrl: footerimage });
                message.reply(embed);
                return;
              }
              if (poweron == true) {
                var runcommand = message.content
                  .toLowerCase()
                  .slice(5 + prefix.length)
                  .replace(/"/g, '\\"');

                var response1 = await fetch(
                  panellink + '/api/client/servers/' + focused + '/command',
                  {
                    method: 'post',
                    headers: {
                      Authorization: 'Bearer ' + api,
                      'Content-Type': 'application/json'
                    },
                    body: `{ "command": "${runcommand}" }`
                  }
                );
                if (response1.status !== 204) {
                  if (checksend == 1) {
                    add = '';
                  } else {
                    add = ' or your server is off';
                  }
                  var embed = new discord.Embed()
                    .setTitle('An error has occured.')
                    .setColor(color)
                    .setDescription(
                      `Your API code or/and focused server might be invalid${add}!`
                    )
                    .setFooter({ text: footername, iconUrl: footerimage });
                  message.reply(embed);
                  return;
                } else {
                  var embed = new discord.Embed()
                    .setTitle('Success!')
                    .setColor(color)
                    .setDescription(
                      `Successfully ran the command on the server.`
                    )
                    .setFooter({ text: footername, iconUrl: footerimage });
                  message.reply(embed);
                  return;
                }
              }
            }
          } catch (err1) {
            console.log(err1);
          }
        } else {
          message.reply(errorsetapiembed);
          return;
        }
        return;
      }
    }
  } catch (err) {
    console.log(err);
  }
});

const cmds = new discord.command.CommandGroup();
const kv = new pylon.KVNamespace('tags');

cmds.registerCommand(
  'tag.set',
  (ctx) => ({
    name: ctx.string(),
    value: ctx.text()
  }),
  async ({ message }, { name, value }) => {
    await kv.put(name, value);
    message.reply('OK, Set!');
  }
);

cmds.registerCommand(
  'tag',
  (ctx) => ({
    name: ctx.string()
  }),
  async ({ message }, { name }) => {
    const value = await kv.get(name);
    if (value !== undefined) {
      await message.reply({
        content: `${name} = ${value}`,
        allowedMentions: {}
      });
    } else {
      await message.reply({
        content: `No tag named ${name} exists.`,
        allowedMentions: {}
      });
    }
  }
);
