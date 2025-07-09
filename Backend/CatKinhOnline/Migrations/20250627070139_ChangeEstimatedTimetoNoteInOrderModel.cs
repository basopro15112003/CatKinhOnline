using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CatKinhOnline.Migrations
{
    /// <inheritdoc />
    public partial class ChangeEstimatedTimetoNoteInOrderModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstimatedDate",
                table: "Orders");

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Note",
                table: "Orders");

            migrationBuilder.AddColumn<DateTime>(
                name: "EstimatedDate",
                table: "Orders",
                type: "datetime2",
                nullable: true);
        }
    }
}
