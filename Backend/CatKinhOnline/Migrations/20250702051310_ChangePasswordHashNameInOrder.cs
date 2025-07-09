using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CatKinhOnline.Migrations
{
    /// <inheritdoc />
    public partial class ChangePasswordHashNameInOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "Orders",
                newName: "FullName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "Orders",
                newName: "PasswordHash");
        }
    }
}
