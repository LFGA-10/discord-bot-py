import os
import discord
from discord.ext import commands
from dotenv import load_dotenv
import logging

load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)

# Bot configuration
TOKEN = os.getenv('DISCORD_TOKEN')
PREFIX = '!'

intents = discord.Intents.default()
intents.message_content = True
intents.members = True

bot = commands.Bot(command_prefix=PREFIX, intents=intents, help_command=None)

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name} ({bot.user.id})')
    print('------')
    await bot.change_presence(activity=discord.Game(name="Premium Bot v1.0"))

@bot.command()
async def ping(ctx):
    """Checks the bot's latency."""
    await ctx.send(f'🏓 Pong! Latency: {round(bot.latency * 1000)}ms')

@bot.command()
@commands.has_permissions(manage_messages=True)
async def clear(ctx, amount: int = 5):
    """Clears a specified amount of messages."""
    await ctx.channel.purge(limit=amount + 1)
    await ctx.send(f'🧹 Cleared {amount} messages!', delete_after=5)

@bot.command()
@commands.has_permissions(kick_members=True)
async def kick(ctx, member: discord.Member, *, reason=None):
    """Kicks a member from the server."""
    await member.kick(reason=reason)
    await ctx.send(f'🚫 Kicked {member.display_name}. Reason: {reason}')

@bot.command()
async def serverinfo(ctx):
    """Displays information about the server."""
    guild = ctx.guild
    embed = discord.Embed(title=f"{guild.name} Info", color=discord.Color.blue())
    embed.add_field(name="Owner", value=guild.owner, inline=True)
    embed.add_field(name="Members", value=guild.member_count, inline=True)
    embed.add_field(name="Created At", value=guild.created_at.strftime("%B %d, %Y"), inline=False)
    embed.set_thumbnail(url=guild.icon.url if guild.icon else None)
    await ctx.send(embed=embed)

@bot.command()
async def help(ctx):
    """Custom help command."""
    embed = discord.Embed(title="Bot Commands", color=discord.Color.purple())
    embed.add_field(name="!ping", value="Check latency", inline=False)
    embed.add_field(name="!clear <n>", value="Purge messages", inline=False)
    embed.add_field(name="!kick <user>", value="Kick user", inline=False)
    embed.add_field(name="!serverinfo", value="Show server stats", inline=False)
    await ctx.send(embed=embed)

if __name__ == '__main__':
    if TOKEN:
        bot.run(TOKEN)
    else:
        print("Error: DISCORD_TOKEN not found in environment variables.")
